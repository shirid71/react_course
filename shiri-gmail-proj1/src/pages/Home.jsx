import imgUrl from '../assets/imgs/gmail-icon.png'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to my Gmail App</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
