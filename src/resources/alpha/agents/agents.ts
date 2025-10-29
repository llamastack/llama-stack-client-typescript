// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as SessionAPI from './session';
import { Session } from './session';
import * as StepsAPI from './steps';
import { Steps } from './steps';
import * as TurnAPI from './turn';
import { Turn } from './turn';

export class Agents extends APIResource {
  session: SessionAPI.Session = new SessionAPI.Session(this._client);
  steps: StepsAPI.Steps = new StepsAPI.Steps(this._client);
  turn: TurnAPI.Turn = new TurnAPI.Turn(this._client);
}

Agents.Session = Session;
Agents.Steps = Steps;
Agents.Turn = Turn;

export declare namespace Agents {
  export { Session as Session };

  export { Steps as Steps };

  export { Turn as Turn };
}
