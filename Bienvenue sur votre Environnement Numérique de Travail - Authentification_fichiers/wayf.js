(function wayfMemorisation() {
    'use strict';
    var wayfComposants = [].slice.call(document.querySelectorAll('.js-wayf-composant')),
        wayfSubComposants = [].slice.call(document.querySelectorAll('.js-wayf-sub-composant')),
        noMemoBlock = document.querySelector('.js-no-memo'),
        memos = [].slice.call(document.querySelectorAll('.js-memo-radio'));

    function updateMemoBlock(wayfComposant) {
        var element = wayfComposant;
        if (element.classList.contains('js-wayf-composite')) {
            element = element.parentElement.querySelector('.js-wayf-sub-composant').selectedOptions[0];
        }
        toggleMemoBlock(element);
    }

    function toggleMemoBlock(element) {
        var isMemo = element.getAttribute('data-memorisable') === 'true';
        if (!isMemo) {
            noMemoBlock.classList.remove('hide');
        } else {
            noMemoBlock.classList.add('hide');
        }
        memos.forEach(function (memo) {
            memo.disabled = !isMemo;
        });
    }

    if (noMemoBlock) {
        wayfComposants.forEach(function eachRadio(wayfComposant) {
            wayfComposant.addEventListener('change', function () {
                updateMemoBlock(wayfComposant);
            });
        });

        wayfSubComposants.forEach(function eachSelect(subComposant) {
            subComposant.addEventListener('change', function () {
                toggleMemoBlock(subComposant.selectedOptions[0]);
            });
        });

        wayfComposants.concat(wayfSubComposants).filter(function (comp) {
            return comp.checked || comp.selectedOptions &&
                comp.selectedOptions[0] && comp.selectedOptions[0].value !== '';
        }).forEach(function (comp) {
            toggleMemoBlock(comp.selectedOptions ? comp.selectedOptions[0] : comp);
        });
    }

    (function wayfToggle() {
        var toggles = [].slice.call(document.querySelectorAll('.js-wayftoggle'));

        function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        }

        function getAssociatedBlock(toggle) {
            var parentFieldset = closest(toggle, function (element) {
                return element.tagName === 'FIELDSET';
            });
            return parentFieldset.querySelector('.js-wayfchoices');
        }
        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var block = getAssociatedBlock(toggle),
                    icon = toggle.querySelector('.js-icon');
                if (toggle.getAttribute('aria-expanded') !== 'true') {
                    block.classList.remove('hide');
                    toggle.setAttribute('aria-expanded', true);
                    icon.classList.remove('icon--plus');
                    icon.classList.add('icon--minus');
                } else {
                    block.classList.add('hide');
                    toggle.setAttribute('aria-expanded', false);
                    icon.classList.add('icon--plus');
                    icon.classList.remove('icon--minus');
                }
            });
        });

    })();
})();