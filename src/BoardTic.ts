import { Board, BoardParam } from "./Board";

export class BoardTic extends Board {

    constructor(
        str: string[] | string = ["_________"],
        init: boolean = true        
    ) {
        let normalized: string[] | string = str

        if (Array.isArray(str)) {
            if (str.length === 1) normalized = str[0]
            else normalized = str
        }

        if (typeof normalized === "string") {
            if (normalized.length !== 9) normalized = "_________"
        } else {
            if (normalized.length !== 9) normalized = "_________"
        }

        if (init) super(normalized, BoardTicParam.row, BoardTicParam.col)
        else super(normalized)
    }

    clone(init: boolean=false): Board {
        return new BoardTic([...this.cells], init)
    }

    private getLineChar(line: number[]): string[] {
        return [this.cells[line[0]], this.cells[line[1]], this.cells[line[2]]];
    }

    private static winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    checkWin() {
        // TODO
        // Если имеется комбинация из трех одинаковых символов "X" или "0" 
        //  в линию - возвращает этот символ
        // Иначе возвращает символ "_"
        return "_"
    }

    override status(): string {
        // TODO
        // возвращает либо строку с результатом игры, либо, 
        //   если игра не закончена, вызывает status родителя.
        return ""
    }

}

export const BoardTicParam: BoardParam = {
    row: 3,
    col: 3
}