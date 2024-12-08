enum Status {
    /**
     * Enum representing the Status of a position on a goban
     */
    WHITE = "WHITE",
    BLACK = "BLACK",
    EMPTY = "EMPTY",
    OUT = "OUT",
}



export class Goban {
    private goban: string[];

    constructor(goban: string[]) {
        this.goban = goban;
    }

    getStatus(x: number, y: number): Status {
        if (
            !this.goban ||
            x < 0 ||
            y < 0 ||
            y >= this.goban.length ||
            x >= this.goban[0].length
        ) {
            return Status.OUT;
        } else if (this.goban[y][x] === ".") {
            return Status.EMPTY;
        } else if (this.goban[y][x] === "o") {
            return Status.WHITE;
        } else if (this.goban[y][x] === "#") {
            return Status.BLACK;
        }

        throw new Error(`Unknown goban value ${this.goban[y][x]}`);
    }

    isTaken(x: number, y: number): boolean {
        const stoneStatus = this.getStatus(x, y);
        if (stoneStatus === (Status.OUT || Status.EMPTY)) return false

        const checked = new Set<string>();
        const coordinates: [number, number][] = [[x, y]];
        let emptySpace = false

        const stringify = (x: number, y: number) => `${x}, ${y}`

        while (coordinates.length > 0) {
            const [coordinateX, coordinateY] = coordinates.pop()!;

            if(checked.has(stringify(coordinateX, coordinateY))) continue;

            checked.add(stringify(coordinateX, coordinateY));

            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
                ];

            for(const [directionX, directionY] of directions) {
                const adjacentX = coordinateX + directionX;
                const adjacentY = coordinateY + directionY;
                const adjacentStatus = this.getStatus(adjacentX, adjacentY);
                if(adjacentStatus === Status.EMPTY) {
                    emptySpace = true
                } else if (adjacentStatus === stoneStatus && !checked.has(stringify(adjacentX, adjacentY))) {
                    coordinates.push([adjacentX, adjacentY]);
                }
            }
            if (emptySpace) {
                return false;
            }
        }
        return true
    }
}