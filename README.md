# eckspress

Just a way to use middlewares with contexts with nice typescript type inference.

# Example

An example usage, for what is currently implemented, could be something like this:

```typescript
import { Request, Response, Router } from 'express';
import { BadRequest, Endpoint, Success } from 'eckspress';

const router = Router();
export default router;

// each type of response has a static method for adding logging for example
// note that the status code is already set before this is called
BadRequest.Handler = async (req, res, body, extra) => {
    console.log('BAD REQUEST', JSON.stringify(extra));
};

// a really simple middleware
async function paramID(req: Request, res: Response) {
    if (isNaN(+req.params.id)) {
        // automatically handles response
        return new BadRequest('invalid id, must be number', {
            params: req.params.id,
        });
    }
    return { id: +req.params.id };
}

router.get(
    '/:id',
    Endpoint([paramID], async (context, req, res) => {
        return new Success(`Requested id ${context.id}`);

        // you can also manually handle the response by returning the express.Response instance:
        // return res.status(200).send(``);
    }),
);
```

Your `context` parameter in the handler would automatically tell you what the middlewares provide you with.

When a middleware returns a `BadResult` (like `BadRequest`), no further middlewares not handler are called, and an apropriate response will automatically be sent back.

With a middleware being able to return an error and stop the chain flow, easily you can implement an authorization middleware.
