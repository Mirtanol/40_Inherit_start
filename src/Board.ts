export type BoardParam = {
    row: number,
    col: number
}

// Абстрактный класс доски
export abstract class Board {
    cells: string[]

    static row: number
    static col: number

    constructor(
        str: string[] | string,
        row?: number,
        col?: number,
    ) {
        if (row != null) Board.row = row
        if (col != null) Board.col = col

        if (typeof str === "string") {
            const res: string[] = []
            for (let i = 0; i < str.length; i++) res.push(str.charAt(i))
            this.cells = res
        } 
        else {
            this.cells = [...str]
        }
    }

    abstract clone(): Board

    isFill(): boolean {
        return this.cells.every((c) => c !== "_" && c !== " ")
    }

    move(index: number, sym: string): boolean {
        // TODO
        // Если ячейка this.cell[index] занята - возвращает false
        // Записывает в ячейку cell и возвращает true
        return true
    }

    status(): string {
        // TODO
        // Если доска заполнена возвращает "Игра закончена"
        //   если игра не закончена, строку "Идет игра".
        return "Идет игра"
    }
}