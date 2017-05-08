import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import config from '../config/config';

const ENCODING = 'utf-8';
const EMAIL_TEMPLATE_DIR = config.notifications.email.templateDir ? path.resolve(__dirname, config.notifications.email.templateDir) : path.resolve(__dirname, '../common/emailTemplate/');

/**
 * Render email template.
 *
 * @param {String} filename
 * @param {Object} params
 * @returns {String}
 */
export function render(filename, params) {
  const templateFile = path.join(EMAIL_TEMPLATE_DIR, `${filename}.html`);

  const html = fs.readFileSync(templateFile, ENCODING);
  let template = handlebars.compile(html);

  return template(params);
}
