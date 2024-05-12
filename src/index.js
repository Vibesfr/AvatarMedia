export default class AvatarMedia {
  static get toolbox() {
    return {
      title: 'Avatar Media',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" style="height: 16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-cog"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>'
    };
  }

  constructor({ data, config, api }) {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

    this.api = api;
    this.data = data;
    this.data.user = data.user || config.currentUser || {};
    this.data.avatar = this._generateUserImageUrl(this.data.user);
    this.data.readTime = data.readTime || 0;
    this.data.creationDate = data.creationDate || formattedDate;
    this.users = config.users || [];
    this.container = undefined;
  }

  static get enableLineBreaks() {
    return true;
  }

  renderSettings() {
    const userSettings = this.users.map((type) => ({
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      name: `user-${type.name}`,
      label: type.name,
      toggle: 'alert',
      isActive: this.data.user?.id === type.id,
      onActivate: () => {
        this._changeUser(type);
        this._changeAvatar(type);
      },
    }))

    // Add an input field for the read time
    const readTimeSetting = document.createElement('div');
    readTimeSetting.innerHTML = `
    <div class="cdx-search-field" style="margin: 4px 0">
        <div class="cdx-search-field__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
        </div>
        <input type="number" name="readTime" class="cdx-search-field__input" placeholder="Temps de lecture (min)" value="${this.data.readTime}">
    </div>
  `;

    readTimeSetting.querySelector('input').addEventListener('change', () => {
      this._changeReadTime(readTimeSetting.querySelector('input').value);
    });


    return [...userSettings, readTimeSetting];
  }

  _generateUserImageUrl(user) {
    const encodedName = encodeURIComponent(user.name);
    // Construct the API URL with the encoded name
    return `https://api.dicebear.com/8.x/initials/svg?seed=${encodedName}`;
  }
  _changeUser(user) {
    this.data.user = user;
    this.container.querySelector('.user').textContent = user.name;
  }
  _changeAvatar() {
    this.data.avatar = this._generateUserImageUrl(this.data.user);
    this.container.querySelector('.avatar').src = this.data.avatar;
  }

  _changeReadTime(readTime) {
    this.data.readTime = readTime;
    this.container.querySelector('.readTime').textContent = readTime + ' min';
  }

  render() {
    this.container = document.createElement('div');
    this.container.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <div class="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
        <div class="flex-shrink-0">
          <img class="size-12 rounded-full avatar" src="${this.data.avatar}" alt="Image Description">
        </div>

        <div class="grow">
          <div class="flex justify-between items-center gap-x-2">
            <div>
              <div class="inline-block">
                <div class="hs-tooltip-toggle sm:mb-1 block text-start">
                  <span class="user font-semibold text-gray-800">
                    ${this.data.user.name}
                  </span>
                </div>
              </div>

              <ul class="text-xs text-gray-500">
                <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                  ${this.data.creationDate}
                </li>
                <li class="readTime inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                  ${this.data.readTime} min
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return this.container;
  }

  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @return {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  save(blockContent) {
    return {
      readTime: this.data.readTime,
      creationDate: this.data.creationDate,
      user: this.data.user,
      avatar: this.data.avatar,
    };
  }
}
