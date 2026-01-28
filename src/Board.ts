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
        if (index < 0 || index >= this.cells.length) return false
        if (this.cells[index] !== "_" && this.cells[index] !== " ") return false
        this.cells[index] = sym
        return true
    }

    status(): string {
        // TODO
        // Если доска заполнена возвращает "Игра закончена"
        //   если игра не закончена, строку "Идет игра".
        return "Идет игра"
    }
}