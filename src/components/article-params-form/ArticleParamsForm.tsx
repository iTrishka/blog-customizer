import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [selectedFontSize, setSelectedFontSize] = useState(
		articleState.fontSizeOption
	);
	const [selectedFont, setSelectedFont] = useState(
		articleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		articleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		articleState.contentWidth
	);

	const asideRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	function toggleParamForm() {
		setIsOpen((prevState) => !prevState);
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const elem = e.target as HTMLElement;
			if (
				asideRef.current &&
				asideRef.current !== elem &&
				!asideRef.current.contains(elem) &&
				arrowButtonRef.current &&
				arrowButtonRef.current !== elem &&
				!arrowButtonRef.current.contains(elem)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClickOutside);
			return () => window.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	const setArticleParamsInSelects = (source: ArticleStateType) => {
		setSelectedFont(source.fontFamilyOption);
		setSelectedFontSize(source.fontSizeOption);
		setSelectedFontColor(source.fontColor);
		setSelectedBackgroundColor(source.backgroundColor);
		setSelectedContentWidthArr(source.contentWidth);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidthArr,
			fontSizeOption: selectedFontSize,
		});
	};

	const handleResetForm = () => {
		setArticleState(defaultArticleState);
		setArticleParamsInSelects(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				toggleParamForm={toggleParamForm}
				isOpen={isOpen}
				ref={arrowButtonRef}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						selected={selectedContentWidthArr}
						onChange={setSelectedContentWidthArr}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => handleResetForm()}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
