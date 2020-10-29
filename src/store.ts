import { Client, Expr, query as q } from 'faunadb'
import Player from './player'

export default class Store {
    private DbKey: string = "fnAD5VWvjSACB8IMICKM1AMubjYW_iYNPLK8PJf3";

    save(player: Player) {
        this.readScores().then(highscore => {
            if (highscore.length === 0 || player.score > highscore[highscore.length - 1].score) {
                this.writeScore(player);
            }
        });
    }

    clear(): void {
        const query = q.Map(q.Paginate(q.Match(q.Ref("indexes/scores")), { size: 1000000 }), q.Lambda(ref => q.Delete(ref)));
        this.executeQuery(query);
    }

    readScores(): Promise<Player[]> {
        const query = q.Paginate(q.Match(q.Ref("indexes/sorted_scores")), { size: 10 });

        return this.executeQuery(query).then((response: any) => response.data.map(score => <Player>{
            score: score[0],
            name: score[1]
        }));
    }

    writeScore(player): Promise<object> {
        const name = window.prompt("Gratulerer, du har nådd topplisten! Vennligst skriv inn navnet ditt:")
        const query = q.Create(q.Collection("scores"), {
            data: {
                ...player,
                name: name
            }
        });
        return this.executeQuery(query)
    }

    executeQuery(query: Expr): Promise<object> {
        const client = new Client({
            secret: this.DbKey
        });

        return client.query(query);
    }
}