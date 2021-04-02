import textToSpeech from '@google-cloud/text-to-speech';
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import file from 'fs';
import {Mensagem} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class TextToSpeechService {
  constructor(/* Add @inject to inject parameters */) {}

  async getSpeech(mensagem: string): Promise<string | undefined> {
    const client = new textToSpeech.TextToSpeechClient();
    try {
      const [audio] = await client.synthesizeSpeech({
        input: {text: mensagem},
        audioConfig: {
          audioEncoding: 'MP3',
          // speakingRate: 0.25,
        },
        voice: {
          ssmlGender: 'FEMALE',
          languageCode: 'pt-BR',
          // name: 'pt-BR-Wavenet-A',
        },
      });
      const path = `${process.env.storage_path}/1.mp3`;
      file.writeFileSync(path, audio.audioContent, {mode: '0777'});
      return path;
    } catch (e) {
      console.log('Falha ao obter Audio:' + e.message);
    }
  }
}
