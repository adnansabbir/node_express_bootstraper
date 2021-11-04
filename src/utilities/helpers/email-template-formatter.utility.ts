const replaceAll = (originalString: string, replaceWord: string, withWord: string): string => {
    return originalString.replace(new RegExp(replaceWord, 'g'), withWord);
}

export const getEmailTemplateWithVariables = (template: string, data: { [key: string]: string }): string => {
    Object.keys(data).forEach(key => {
        template = replaceAll(template, `{{${key}}}`, data[key]);
    });

    return template;
}
