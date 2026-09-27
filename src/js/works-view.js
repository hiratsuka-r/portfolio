(() => {
    const escapeHtml = (value) =>
        String(value).replace(
            /[&<>"']/g,
            (character) =>
                ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;',
                })[character]
        );

    const toArray = (value) => {
        if (Array.isArray(value)) return value;
        return value ? [value] : [];
    };

    const renderTags = (categories) =>
        toArray(categories)
            .map((category) => `<span class="label-genre">${escapeHtml(category)}</span>`)
            .join('');

    const getProjectInfo = (project, work) => {
        if (!project) return null;

        const isPersonal =
            work.basicInfo?.format === '個人制作' || (typeof project === 'string' && project.includes('個人制作'));
        const projectName = typeof project === 'string' ? project : project.name;

        return {
            label: isPersonal ? '制作区分' : '参画プロジェクト',
            name: projectName || '',
            company: typeof project === 'object' ? project.company || '' : '',
        };
    };

    const getCardTags = (work) =>
        [...toArray(work.category).slice(1), ...toArray(work.responsibilityTags)].filter(
            (tag, index, tags) => tags.indexOf(tag) === index
        );

    const basicInfoLabels = {
        serviceType: '種類',
        industry: '分野',
        format: '制作形態',
        period: '期間',
        process: '担当工程',
        role: '担当',
        teamSize: '体制',
    };

    const technologyGroupLabels = {
        Frontend: 'フロントエンド',
        Backend: 'バックエンド',
        Tools: 'ツール',
    };

    const getWorksMarkup = (works) =>
        works
            .map(
                (work) => `
      <div
        class="work is-animated-hover js_work-card"
        data-work-id="${escapeHtml(work.id)}"
        role="button"
        tabindex="0"
        aria-label="${escapeHtml(work.title)}の詳細を表示"
      >
        <div class="work-image">
          <img src="${escapeHtml(work.image)}" alt="" />
          ${
              toArray(work.category)[0]
                  ? `<span class="work-category-badge">${escapeHtml(toArray(work.category)[0])}</span>`
                  : ''
          }
        </div>
        <p class="work-name">${escapeHtml(work.title)}</p>
        ${getCardTags(work).length ? `<div class="work__label">${renderTags(getCardTags(work))}</div>` : ''}
        ${getProjectMarkup(work)}
        <span class="work-detail-action" aria-hidden="true">
          詳細を見る <span>→</span>
        </span>
      </div>
    `
            )
            .join('');

    const getProjectMarkup = (work) => {
        const project = getProjectInfo(work.project, work);
        if (!project?.name) return '';

        return `<p class="work-project">
            <span>${project.label}</span>
            ${escapeHtml(project.name)}
          </p>`;
    };

    const renderOptionalList = (title, items, className = '') =>
        items && items.length
            ? `<section class="work-modal__section ${className}">
            <h3>${title}</h3>
            <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </section>`
            : '';

    const renderSection = (title, content, className = '') =>
        content
            ? `<section class="work-modal__section ${className}">
            <h3>${title}</h3>
            ${content}
          </section>`
            : '';

    const renderTechnologies = (technologies) => {
        if (!technologies) return '';

        if (Array.isArray(technologies)) {
            return technologies.length
                ? `<div class="work-modal__technologies">${technologies
                      .map(({ name }) => `<span class="work-modal__technology">${escapeHtml(name)}</span>`)
                      .join('')}</div>`
                : '';
        }

        const groups = Object.entries(technologies)
            .filter(([, items]) => Array.isArray(items) && items.length)
            .map(
                ([group, items]) =>
                    `<div class="work-modal__technology-group">
              <h4>${escapeHtml(technologyGroupLabels[group] || group)}</h4>
              <div class="work-modal__technologies">${items
                  .map(
                      (item) =>
                          `<span class="work-modal__technology">${escapeHtml(
                              typeof item === 'string' ? item : item.name
                          )}</span>`
                  )
                  .join('')}</div>
            </div>`
            )
            .join('');

        return groups || '';
    };

    const getModalMarkup = (work) => {
        const basicInfo = work.basicInfo
            ? Object.entries(work.basicInfo)
                  .filter(([, value]) => value)
                  .map(
                      ([label, value]) =>
                          `<dt>${escapeHtml(basicInfoLabels[label] || label)}</dt>
                           <dd>${escapeHtml(value)}</dd>`
                  )
                  .join('')
            : '';
        const responsibilities = work.responsibilities || [];
        const technologyContent = renderTechnologies(work.technologies);
        const overview = work.description || work.overview;
        const project = getProjectInfo(work.project, work);
        const projectCompany = project?.company ? `<dt>参画先</dt><dd>${escapeHtml(project.company)}</dd>` : '';
        const image = work.link
            ? `<a
                class="work-modal__image-link"
                href="${escapeHtml(work.link)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHtml(work.title)}の公開ページを見る"
              >
                <img
                  class="work-modal__image"
                  src="${escapeHtml(work.image)}"
                  alt="${escapeHtml(work.title)}"
                />
                <span
                  class="work-modal__image-action"
                  aria-hidden="true"
                >公開ページを見る <span>↗</span></span>
              </a>`
            : `<img
                class="work-modal__image"
                src="${escapeHtml(work.image)}"
                alt="${escapeHtml(work.title)}"
              />`;

        return `
      <div class="work-modal__hero">
        <section class="work-modal__header-info">
          ${
              toArray(work.category).length
                  ? `<div class="work-modal__work-type">${renderTags(work.category)}</div>`
                  : ''
          }
          <h2 id="work-modal-title">${escapeHtml(work.title)}</h2>
          ${work.subtitle ? `<p class="work-modal__subtitle">${escapeHtml(work.subtitle)}</p>` : ''}
          ${overview ? `<p class="work-modal__summary">${escapeHtml(overview)}</p>` : ''}
          ${
              toArray(work.responsibilityTags).length
                  ? `<div class="work-modal__responsibility-tags">
                ${renderTags(work.responsibilityTags)}
              </div>`
                  : ''
          }
          ${
              project?.name
                  ? `<p class="work-modal__project">
                <span>${project.label}</span>
                ${escapeHtml(project.name)}
              </p>`
                  : ''
          }
        </section>
        <section class="work-modal__section work-modal__section--image">
          ${image}
        </section>
      </div>
      <div class="work-modal__columns">
        <div class="work-modal__column work-modal__column--left">
          ${
              basicInfo || projectCompany
                  ? `<section class="work-modal__section work-modal__section--basic">
            <h3>基本情報</h3>
            <dl>${basicInfo}${projectCompany}</dl>
          </section>`
                  : ''
          }
          ${
              work.achievements && work.achievements.length
                  ? renderOptionalList('工夫した点・成果', work.achievements, 'work-modal__section--achievements')
                  : ''
          }
        </div>
        <div class="work-modal__column work-modal__column--right">
          ${
              responsibilities.length
                  ? renderSection(
                        '担当業務',
                        `<ul>${responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`,
                        'work-modal__section--responsibilities'
                    )
                  : ''
          }
          ${technologyContent ? renderSection('使用技術', technologyContent, 'work-modal__section--technologies') : ''}
          ${work.note ? `<p class="work-modal__note">${escapeHtml(work.note)}</p>` : ''}
        </div>
      </div>
    `;
    };

    window.WorksView = {
        getModalMarkup,
        getWorksMarkup,
    };
})();
