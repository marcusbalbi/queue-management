import {inject, service} from '@loopback/core';
import {
  get,
  param,
  post,
  Request,
  response,
  Response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {Mensagem} from '../models';
import {TextToSpeechService} from '../services';
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @service(TextToSpeechService)
    private txtToSpeechService: TextToSpeechService,
  ) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @get('/call/{message}')
  async call(
    @param.path.string('message') message: string,
    @inject(RestBindings.Http.RESPONSE) resp: Response,
  ) {
    // use service to create mp3 file
    // create a message with filepath, name and dates
    // save to database with status ready_to_Call
    // return uuid
    const path = await this.txtToSpeechService.getSpeech(message);
    if (!path) {
      throw new Error('Falha ao obter Arquivo!');
    }
    resp.download(path);
    return resp
    // const m = new Mensagem();
    // m.caminho = 'esdasdsa';
    // // Reply with a greeting, the current time, the url, and request headers
    // return {
    //   mensagem: m,
    // };
  }

  // controller stop calling
  // recall (feature ?)
}
