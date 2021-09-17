import Flasher, { Envelope, FlasherInterface, FlasherOptions } from '@flasher/flasher';
import { Notyf } from 'notyf';
import { INotyfOptions } from 'notyf/notyf.options';

import 'notyf/notyf.min.css';

export default class NotyfFactory implements FlasherInterface {
  private notyf?: Notyf;

  render(envelope: Envelope): void {
    const options = {...envelope.notification, ...envelope.notification.options};

    this.notyf?.open(options);
  }

  renderOptions(options: FlasherOptions): void {
    const nOptions = options as unknown as INotyfOptions;

    nOptions.types = nOptions.types || [];

    nOptions.types.push({
      type: 'info',
      className: 'notyf__toast--info',
      backgroundColor: '#5784E5',
      icon: {
        className: 'notyf__icon--warning',
        tagName: 'i',
      },
    });

    nOptions.types.push({
      type: 'warning',
      className: 'notyf__toast--warning',
      backgroundColor: '#E3A008',
      icon: {
        className: 'notyf__icon--warning',
        tagName: 'i',
      },
    });

    this.notyf = this.notyf || new Notyf(nOptions as Partial<INotyfOptions>);
  }
}

const flasher = Flasher.getInstance();
flasher.addFactory('notyf', new NotyfFactory());
