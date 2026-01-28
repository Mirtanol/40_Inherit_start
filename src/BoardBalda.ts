import { Board, BoardParam } from "./Board";


export class BoardBalda extends Board {
    constructor(
        str: string[] | string = "балда",
        init: boolean = true
    ) {
        let normalized: string[] | string = str

        if (Array.isArray(str)) {
            if (str.length === 1) normalized = str[0]
            else normalized = str
        }

        if (typeof normalized === "string" && normalized.length === 5) {
            const spaces10 = new Array(11).join(" ")
            normalized = spaces10 + normalized + spaces10
        }

        if (init) super(normalized, BoardBaldaParam.row, BoardBaldaParam.col)
        else super(normalized)
    }
    
    clone(init: boolean = false): Board {
        // TODO
        // Функция должна вернуть копию объекта
        // Если init, то дополнительно инициализируются
        //  статические поля класса
        return this
    }
}

export const BoardBaldaParam: BoardParam = {
    row: 5,
    col: 5
}