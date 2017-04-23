import fs from 'fs';
import handlebars from 'handlebars';

const ENCODING = 'utf-8';
const EMAIL_TEMPLATE_DIR = `${__dirname}/../common/emailTemplate/`;

export function renderEmailTemplate(filename, params){
  const templateFile = `${EMAIL_TEMPLATE_DIR}${filename}.html`;

  const html = fs.readFileSync(templateFile, ENCODING);
  let template = handlebars.compile(html);

  return template(params);
}
