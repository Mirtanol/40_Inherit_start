import { Input } from "./Input";

export class InputBalda extends Input {
    override get html(): string  {
        return "<input id='inputBalda'></input>"
    }

    get sym(): string {
    const el = document.getElementById("inputBalda") as HTMLInputElement | null
    if (!el) return ""

    const ch = el.value.trim().charAt(0)
    if (!ch) return ""

    if (!/^[а-яё]$/i.test(ch)) return ""
    return ch.toLowerCase()
    }
    
    move(): void {
        // TODO
        //  очищает поле ввода
    }
}