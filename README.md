# Pokemon-Nuzlocke-Tool

## Introduction

This project is my attempt at introducting myself to developing and deploying desktop applications. I therefore wanted to start with a small to medium sized project that would combine front-end and back-end development. I decided upon the idea of a Pokémon Nuzlocke tracker since it felt like something I could conceivably use for future playthroughs of Pokémon games.

## Frameworks

This projects uses [Next.js](https://nextjs.org/) for the front-end and [Tauri](https://tauri.app/) for back-end and building.

### Next.js

I decided to use Next.js so that I could familiarise myself with one of the most popular React frameworks in popular use. This project helped give me some experience in dealing with basic Next.js features such as routing and client/server components. Next.js obviously offers far more in terms of ease of development and optimisation and I would be interested in using it more in the future to explore its potential.

### Tauri

I learned about Tauri while researching how I could develop and build my application. From what I gather, [Electron](https://www.electronjs.org/) is one of the most highly used tools for building desktop applications. However, I ended up gravitating towards Tauri for several reasons. Firstly, Tauri provided me an excuse to write a back-end in Rust. I tend to enjoy how strongly typed Rust is and I felt that I would make far less mistakes when using it to update data. Secondly, Tauri is super easy to set-up from the command line, allowing me to focus more programming. As far as I remember, the only change I had to make in the config was to allow javascript's `alert` function (which is a temporary measure to handle errors anyway).

While my experience using Tauri was extremely positive, there are several reasons I might be inclined to try using Electron for a future application. Tauri arguably made things too easy and ended up sort of circumventing my goal of educating myself on desktop app development. Furthermore, while I enjoyed programming in Rust, standardising data types across two different languages ended up being a bit of a hassle. Finally, I feel like using Tauri took away from some of the experience of discovering Next.js, where I feel like I could have used more of its features if I solely stuck to Typescript.

## Usage

Start by making sure that [Node.js](https://nodejs.org/en/download/package-manager), [Rust](https://www.rust-lang.org/tools/install) and Tauri are installed. You can run the development server using:

```bash
npm run tauri dev
```

I plan to actually build this thing and link the installer/executable here but that will only be done once the project is fully completed.

## TODO

- [ ] Make the application actually look decent
- [ ] Build the application and check for problems there

## Credits

- <https://nuzlocke.app/> for inspiration
- Nintendo/GAME FREAK for Pokémon names and images
