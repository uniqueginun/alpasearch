function dropdown() {
    return {
        modalOpened: false,
        searchInput: '',
        matchingItems: [],
        get targetEl() {
            return this.$refs.target;
        },
        get selectedValue() {
            return this.$refs.target.value || '';
        },
        targetElOptions(limiter = null) {
            const optionsList = this.targetEl.options;
            const limit = limiter || optionsList.length;
            let arrayOfOptions = [];
            for (let i = 0;i < limit  ; i++) {
                if(optionsList[i].value) {
                    arrayOfOptions[i] = optionsList[i].text;
                }
            }
            return arrayOfOptions;
        },
        openSearchModal() {
            this.modalOpened = true
            this.$refs.searchEl.focus()
        },
        filterOptions(value) {
            const currentSearch = value.toLowerCase();
            const matchingItems = this
                                    .targetElOptions()
                                    .filter(item => item.toLowerCase().match(currentSearch))
                                    .filter((item, index) => index <= 4);
            this.matchingItems = (matchingItems);
        },
        setSelected(value) {
            const optionsList = this.targetEl.options;
            const count = optionsList.length;
            for (let i = 0;i < count  ; i++) {
                if(optionsList[i].text == value){
                    this.targetEl.selectedIndex = i;
                    break;
                }
            }
            this.optionSelected();
        },
        optionSelected() {
            this.modalOpened = false;
            this.searchInput = this.selectedValue;
        },
        intailizer() {
            this.targetEl.classList.add('target-dropdown');;
            this.targetEl.parentElement.appendChild(this.makeImageEl(), this.targetEl);
            this.targetEl.parentElement.insertAdjacentHTML('beforeend', this.makeModalEl());
            this.matchingItems = this.targetElOptions(6);
            this.$watch('searchInput', (value) => this.filterOptions(value));
        },
        makeImageEl() {
            const img = document.createElement('img');
            img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg');
            img.setAttribute('width', 24);
            img.setAttribute('x-on:click', 'openSearchModal');
            img.style.display = 'inline';
            img.style.cursor = 'pointer';
            return img;
        },
        response({code}) {
            console.log(code);
        },
        makeModalEl() {
            const modalHTML = `<div
            class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto"
            x-show="modalOpened"
            x-transition:enter="transition duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition duration-300"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            x-on:keydown="response($event)"
          >
            <div class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100">
              <div
                class="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
                @click.away="modalOpened = false"
                x-show="modalOpened"
                x-transition:enter="transition transform duration-300"
                x-transition:enter-start="scale-0"
                x-transition:enter-end="scale-100"
                x-transition:leave="transition transform duration-300"
                x-transition:leave-start="scale-100"
                x-transition:leave-end="scale-0"
              >
                <main class="p-2 text-center">
                    <div class="relative m-2">
                        <input autofocus x-ref="searchEl" type="search" x-model="searchInput" class="bg-purple-white shadow rounded border-0 p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Search dropdown">
                        <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter"></div>
                    </div>
                    <div class="relative m-2 rounded shadow" x-ref="searchResultsArea">
                        <template x-for="(item, index) in matchingItems" :key="index">
                            <a 
                                class="optionItem focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block border list-none rounded-sm px-3 py-3 text-gray-400 hover:font-extrabold hover:text-indigo-800" 
                                href="#" 
                                x-text="item"
                                x-on:click="setSelected(item)"></a>
                        </template>
                    </div>
                </main>
              </div>
            </div>
          </div>`;
          return modalHTML;
        }
    }
}