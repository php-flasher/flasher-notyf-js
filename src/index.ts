import Flasher, { Envelope, FlasherInterface, FlasherOptions } from '@flasher/flasher';
import { Notyf } from 'notyf';
import { INotyfOptions } from 'notyf/notyf.options';

import 'notyf/notyf.min.css';

export default class NotyfFactory implements FlasherInterface {
  private notyf?: Notyf;

  render(envelope: Envelope): void {
    this.notyf?.open(envelope.notification);
  }

  renderOptions(options: FlasherOptions): void {
    this.notyf = this.notyf || new Notyf(options as Partial<INotyfOptions>);
  }
}

const flasher = Flasher.getInstance();
flasher.addFactory('notyf', new NotyfFactory());
