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
         // TODO
        // Проверяет, что в steps есть элемент с индексом step,
        //  если нет то возвращает false
        // Делает current равным step и обновляет свойство cell в board
        return true  
    }
}