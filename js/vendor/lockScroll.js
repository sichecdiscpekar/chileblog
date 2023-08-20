let dataScrollLocks;
/**
* Блокирует скролл страницы
* Необходим для использования модальных окон
* @param {boolean} state Обязательное
* @param {string} element Обязательное, элемент которому нужно разрешить скролл
* @param {string} name Необязательное, ключ,
* чтобы была возможность открывать окно поверх другого окна
*/
const lockScroll = (state, $element, name) => {
	const element = $element.get(0) ? $element.get(0) : $element;

	if (typeof dataScrollLocks === 'undefined') {
		dataScrollLocks = new Set();
	}

	let scrollLocks = dataScrollLocks;

	if (state) {
		if (typeof name === 'string') {
			scrollLocks.add(name);
		}

		bodyScrollLock.disableBodyScroll(element, {
			reserveScrollBarGap: true,
		});

		$(document.documentElement).addClass('is-lock-scroll');

	} else {
		if (typeof name === 'string') {
			scrollLocks.delete(name);
		}

		bodyScrollLock.enableBodyScroll(element);

		if (!scrollLocks.size) {
			bodyScrollLock.clearAllBodyScrollLocks();

			$(document.documentElement).removeClass('is-lock-scroll');
		}
	}
};