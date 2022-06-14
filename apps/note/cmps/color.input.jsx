
export function ColorInput({ changeClass, handleStyleChange, onCloseColors }) {


    const colors = ['#FBF8CC', '#F1C0E8', '#A3C4F3', '#8EECF5', '#B9FBC0', '#D9D9D9', '#8C8C8C']


    return <section className="color-input">
        <div className={`color-picker ${changeClass}`}>
            <button onClick={onCloseColors}>X</button>
            {colors.map(color => <div className="item-color" key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('backgroundColor', color)}>
            </div>)}
        </div>
    </section>
}
