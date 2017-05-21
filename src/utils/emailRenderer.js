import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import * as config from '../config/config';

/**
 * Render email template.
 *
 * @param {String} filename
 * @param {Object} params
 * @returns {String}
 */
export function render(filename, params) {
  let { encoding, templateDir } = config.get().notifications.email;
  let templateFile = path.join(templateDir, `${filename}.html`);
  let html = fs.readFileSync(templateFile, encoding);
  let template = handlebars.compile(html);

  return template(params);
}
