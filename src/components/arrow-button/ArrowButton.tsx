import { forwardRef } from 'react';

import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { clsx } from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface IArrowButtonProps {
	toggleParamForm: OnClick;
	isOpen: boolean;
}

export const ArrowButton = forwardRef<HTMLDivElement, IArrowButtonProps>(
	function ArrowButton({ toggleParamForm, isOpen }: IArrowButtonProps, ref) {
		return (
			/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
			<div
				ref={ref}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, isOpen && styles.container_open)}
				onClick={toggleParamForm}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, isOpen && styles.arrow_open)}
				/>
			</div>
		);
	}
);
