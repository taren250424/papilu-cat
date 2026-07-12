## Papilu-cat

A minimalist interactive web toy where a cat and a butterfly quietly play across the screen — and both gracefully dodge your mouse.

## Features

- A cat that gently wanders the screen, naps, and plays with its tail
- A butterfly that flutters around; the cat occasionally chases it, and in quiet moments it perches on the cat
- Smart evasive behavior on mouse hover — your clicks are never blocked
- No UI, no clicks — just quiet presence
- Lightweight, no dependencies

## Installation

Just include the script tag. That’s all.

```html
<script src="https://cdn.jsdelivr.net/gh/taren250424/papilu-cat/dist/papilu-cat.umd.js"></script>
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

If catActions is omitted, two default actions are used (napping and tail play)—you can add as many entries as you want to the catActions array.
However, if any required property is missing from an action, that action will not be applied.

## Customizing the Butterfly

The butterfly is enabled by default. You can restyle it with flyIdle / flyMove (same rules as catIdle / catMove), or turn it off entirely:

```js
PapiluCat.create({
    flyIdle: {
        img: 'spritesheets/flyIdle.png',
        width: 24,
        height: 24,
        startIndex: 0,
        endIndex: 1,
        frameRate: 3,
    },
    flyMove: {
        img: 'spritesheets/flyMove.png',
        width: 24,
        height: 24,
        startIndex: 0,
        endIndex: 3,
        frameRate: 12,
        angleCorrection: 90,
    },
})
```

```js
PapiluCat.create({ butterfly: false }) // cat only
```

If any property is missing from either flyIdle or flyMove, both will fall back to their default settings.

## TypeScript Support

If you're using TypeScript, type definitions are provided in the [papilu-cat.d.ts](https://github.com/taren250424/papilu-cat/blob/main/papilu-cat.d.ts) file.

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