# eckspress

Just a way to use middlewares with contexts with nice typescript type inference.

# Example

An example usage, for what is currently implemented, could be something like this:

```typescript
function paramID(req: Request, res: Response) {
    if (isNaN(+req.params.id)) {
        return new BadRequest('invalid id, must be number', { params: req.params.id });
    }
    return { id: +req.params.id };
}

router.get(
    '/:id',
    eckspress.Endpoint([paramID], async (context, req, res) => {
        return res.status(200).send('hello world', context.id);
    }),
);
```

Your `context` parameter in the handler would automatically tell you what the middlewares provide you with.

When a middleware returns a `BadResult` (like `BadRequest`), no further middlewares not handler are called, and an apropriate response will automatically be sent back.

With a middleware being able to return an error and stop the chain flow, easily you can implement an authorization middleware.
