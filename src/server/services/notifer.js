
import * as slack from './slack';

export function notify(params) {
    if (slack.isEnabled()) {
        slack.notify(params);
    }
}
