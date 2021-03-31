import {Entity, model, property} from '@loopback/repository';

@model()
export class Mensagem extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  texto: string;

  @property({
    type: 'string',
  })
  caminho: string;

  @property({
    type: 'date',
    required: true,
  })
  criadoEm: string;

  @property({
    type: 'date',
    required: true,
  })
  alteradoEm: string;

  constructor(data?: Partial<Mensagem>) {
    super(data);
  }
}

export interface MensagemRelations {
  // describe navigational properties here
}

export type MensagemWithRelations = Mensagem & MensagemRelations;
