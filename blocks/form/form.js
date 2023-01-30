function createSelect(fieldDefinition) {
  const select = document.createElement('select');
  select.id = fieldDefinition.Field;

  if (fieldDefinition.Placeholder) {
    const ph = document.createElement('option');
    ph.textContent = fieldDefinition.Placeholder;
    ph.setAttribute('selected', '');
    ph.setAttribute('disabled', '');
    select.append(ph);
  }

  fieldDefinition.Options.split(',')
    .forEach((o) => {
      const option = document.createElement('option');
      option.textContent = o.trim();
      option.value = o.trim();
      select.append(option);
    });

  if (fieldDefinition.Mandatory === 'x') {
    select.setAttribute('required', 'required');
  }

  return select;
}

function constructPayload(form) {
  const payload = {};

  [...form.elements].forEach((formElement) => {
    if (formElement.type === 'checkbox') {
      if (formElement.checked) payload[formElement.id] = formElement.value;
    } else if (formElement.id) {
      payload[formElement.id] = formElement.value;
    }
  });

  return payload;
}

async function submitForm(form) {
  const payload = constructPayload(form);

  const resp = await fetch(form.dataset.action, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });

  await resp.text();

  return payload;
}

function createButton(fieldDefinition) {
  const button = document.createElement('button');
  button.textContent = fieldDefinition.Label;
  button.classList.add('button');

  if (fieldDefinition.Type === 'submit') {
    button.addEventListener('click', async (event) => {
      const form = button.closest('form');

      if (form.checkValidity()) {
        event.preventDefault();
        button.setAttribute('disabled', '');
        await submitForm(form);
        const redirectTo = fieldDefinition.Extra;
        window.location.href = redirectTo;
      }
    });
  }

  return button;
}

function createHeading(fieldDefinition) {
  const heading = document.createElement('h3');
  heading.textContent = fieldDefinition.Label;

  return heading;
}

function createInput(fieldDefinition) {
  const input = document.createElement('input');
  input.type = fieldDefinition.Type;
  input.id = fieldDefinition.Field;
  input.setAttribute('placeholder', fieldDefinition.Placeholder);

  if (fieldDefinition.Mandatory === 'x') {
    input.setAttribute('required', 'required');
  }

  return input;
}

function createTextArea(fieldDefinition) {
  const input = document.createElement('textarea');
  input.id = fieldDefinition.Field;
  input.setAttribute('placeholder', fieldDefinition.Placeholder);

  if (fieldDefinition.Mandatory === 'x') {
    input.setAttribute('required', 'required');
  }

  const options = (fieldDefinition.Options || '').split(',');
  if (options.length > 0) {
    input.setAttribute('cols', options[0] || 40);
    input.setAttribute('rows', options[1] || 4);
  }

  return input;
}

function createLabel(fieldDefinition) {
  const label = document.createElement('label');
  label.setAttribute('for', fieldDefinition.Field);
  label.textContent = fieldDefinition.Label;

  if (fieldDefinition.Mandatory === 'x') {
    label.classList.add('required');
  }

  return label;
}

function applyRules(form, rules) {
  const payload = constructPayload(form);
  rules.forEach((field) => {
    const {
      type,
      condition: {
        key,
        operator,
        value,
      },
    } = field.rule;
    if (type === 'visible') {
      if (operator === 'eq') {
        if (payload[key] === value) {
          form.querySelector(`.${field.fieldId}`)
            .classList
            .remove('hidden');
        } else {
          form.querySelector(`.${field.fieldId}`)
            .classList
            .add('hidden');
        }
      }
    }
  });
}

async function createForm(formURL) {
  const { pathname } = new URL(formURL);
  const resp = await fetch(pathname);
  const json = await resp.json();
  const form = document.createElement('form');
  form.id = 'form';
  const rules = [];

  [form.dataset.action] = pathname.split('.json');

  json.data.forEach((fieldDefinition) => {
    fieldDefinition.Type = fieldDefinition.Type || 'text';

    const fieldWrapper = document.createElement('div');
    const style = fieldDefinition.Style ? ` form-${fieldDefinition.Style}` : '';
    const fieldId = `form-${fieldDefinition.Type}-wrapper${style}`;

    fieldWrapper.className = fieldId;
    fieldWrapper.classList.add('field-wrapper');

    switch (fieldDefinition.Type) {
      case 'select':
        fieldWrapper.append(createLabel(fieldDefinition));
        fieldWrapper.append(createSelect(fieldDefinition));
        break;
      case 'heading':
        fieldWrapper.append(createHeading(fieldDefinition));
        break;
      case 'checkbox':
        fieldWrapper.append(createInput(fieldDefinition));
        fieldWrapper.append(createLabel(fieldDefinition));
        break;
      case 'text-area':
        fieldWrapper.append(createLabel(fieldDefinition));
        fieldWrapper.append(createTextArea(fieldDefinition));
        break;
      case 'submit':
        fieldWrapper.append(createButton(fieldDefinition));
        break;
      default:
        fieldWrapper.append(createLabel(fieldDefinition));
        fieldWrapper.append(createInput(fieldDefinition));
    }

    if (fieldDefinition.Rules) {
      try {
        rules.push({
          fieldId,
          rule: JSON.parse(fieldDefinition.Rules),
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Invalid Rule ${fieldDefinition.Rules}: ${e}`);
      }
    }

    form.append(fieldWrapper);
  });

  form.addEventListener('change', () => applyRules(form, rules));
  applyRules(form, rules);

  return (form);
}

export default async function decorate(block) {
  const form = block.querySelector('a[href$=".json"]');
  if (!form) {
    return;
  }

  form.replaceWith(await createForm(form.href));
}
