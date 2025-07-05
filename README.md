## Papilu-cat

A minimalist interactive web toy where a cat quietly roams the screen and gracefully dodges your mouse.  

## Features

- A cat that gently wanders the screen
- Smart evasive behavior on mouse hover
- No UI, no clicks — just quiet presence
- Lightweight, no dependencies

## Installation

Just include the script tag. That’s all.

```html
<script src="https://cdn.jsdelivr.net/gh/hn250424/papilu-cat/dist/papilu-cat.umd.js"></script>
```

## Usage

Call PapiluCat.create() to start the cat, and PapiluCat.destroy() to stop and remove it.

```js
PapiluCat.create(options) // start
PapiluCat.destroy()       // stop
```

## Customizing the Cat

You can pass a config object to create() to customize the cat's appearance and animation:

```js
PapiluCat.create({
    loading: {
        img: 'spritesheets/loading.png',
        width: 158,
        height: 316,
        startIndex: 0,
        endIndex: 4,
        frameRate: 8,
    },
    catIdle: {
        img: 'spritesheets/catIdle.png',
        width: 70.3,
        height: 62.5,
        startIndex: 4,
        endIndex: 5,
    },
    catMove: {
        img: 'spritesheets/catMove.png',
        height: 62.5,
        startIndex: 0,
        endIndex: 2,
        frameRate: 8,
        angleCorrection: 90,
    },
    catActions: [
        {
            img: 'spritesheets/catFirstAction.png',
            width: 125,
            height: 125,
            endIndex: 3,
            frameRate: 8,
        },
        {
            img: 'spritesheets/catSecondAction.png',
            width: 16,
            height: 16,
            endIndex: 4,
            frameRate: 8,
        },
    ]
});
```

If any property is missing from either catIdle or catMove, both will fall back to their default settings.
Since catMove rotates based on the movement direction, a top-down view image is recommended for best results.
The default facing angle is 0 degrees, which points to the right—so if your sprite faces upward (as in a top-down view), set angleCorrection to 90.

Actions are independent of the default settings and have no initial configuration—you can add as many entries as you want to the catActions array.
However, if any required property is missing from an action, that action will not be applied.

## TypeScript Support

If you're using TypeScript, type definitions are provided in the [papilu-cat.d.ts](https://github.com/hn250424/papilu-cat/blob/main/papilu-cat.d.ts) file.

You can import the types and API like this:

```ts
const config: PapiluCatConfig = {
    catIdle: {
        img: 'spritesheets/catIdle.png',
        width: 70.3,
        height: 62.5,
        startIndex: 4,
        endIndex: 5,
        frameRate: 1,
    },
    catMove: {
        img: 'spritesheets/catMove.png',
        width: 70.3,
        height: 62.5,
        startIndex: 0,
        endIndex: 2,
        frameRate: 8,
        angleCorrection: 90,
    },
}

PapiluCat.create(config)
```

## License

Includes content from the "Creative Commons Attribution-ShareAlike 3.0 Unported Legal Code",  
licensed under CC BY-SA 3.0: https://creativecommons.org/licenses/by-sa/3.0/legalcode