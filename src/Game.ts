import { BoardParam } from "./Board"
import { GameVC } from "./GameVC"
import { Input } from "./Input"
import { State } from "./State"

// Класс
export class Game {
    // Шаги игры
    steps: State[]
    // Номер текущей игры
    current: number
    // Параметры доски (размеры)
    boardParam: BoardParam
    // интерфейс для пользовательского ввода
    input: Input

    constructor(
        steps: State[] | State,
        input: Input,
        boardParam: BoardParam,
        current: number = 0
    ) {
        if (Array.isArray(steps))
            this.steps = steps
        else
            this.steps = [steps]
        this.current = current
        this.boardParam = boardParam
        this.input = input
    }

    get state(): State {
        return this.steps[this.current]
    }

    clone(): Game {
        const stepsCopy = this.steps.map((s) => s.clone())

        const inputCopy = Object.create(Object.getPrototypeOf(this.input)) as Input
        Object.assign(inputCopy as any, this.input as any)

        return new Game(stepsCopy, inputCopy, this.boardParam, this.current)
    }

    move(index: number): boolean {
        if (this.state.board.status() !== "Идет игра") return false

        const sym = this.input.sym
        if (sym.trim().length === 0) return false

        const boardCopy = this.state.board.clone()
        if (!boardCopy.move(index, sym)) return false

        this.steps = this.steps.slice(0, this.current + 1)
        this.steps.push(new State(boardCopy, sym))
        this.current = this.steps.length - 1

        this.input.move()
        GameVC.draw()
        return true
    }

    toStep(step: number) {
        if (step < 0 || step >= this.steps.length) return false
        this.current = step

        // синхронизация хода для крестиков-ноликов
        let x = 0
        let o = 0
        for (const c of this.state.board.cells) {
            if (c === "X") x++
            else if (c === "0") o++
        }
        const next = x <= o ? "X" : "0"
        if ((this.input as any)._sym !== undefined) (this.input as any)._sym = next

        // для балды — очищаем поле ввода (если оно есть)
        const baldaInput = document.getElementById("inputBalda") as HTMLInputElement | null
        if (baldaInput) baldaInput.value = ""

        GameVC.draw()
        return true
    }
}