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
  const { encoding, templateDir } = config.get().notifications.email;
  const templateFile = path.join(templateDir, `${filename}.html`);
  const html = fs.readFileSync(templateFile, encoding);
  const template = handlebars.compile(html);

  return template(params);
}
