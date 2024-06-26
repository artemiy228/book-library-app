import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import books from '../../data/books.json'
import {
	addBook,
	fetchBook,
	selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import { createBookWithID } from '../../utils/createBookWithID'
import styles from './BookForm.module.scss'

export function BookForm() {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
	const dispatch = useDispatch()

	function addRandomBook(e) {
		e.preventDefault()
		const randomIndex = Math.floor(Math.random() * books.length)
		const randomBook = books[randomIndex]
		const randomBookWithId = createBookWithID(randomBook, 'random')
		dispatch(addBook(randomBookWithId))
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (title && author) {
			console.log(title, author)
			const book = createBookWithID({ title, author }, 'manual')

			dispatch(addBook(book))
			setTitle('')
			setAuthor('')
		} else {
			dispatch(setError('You must fill Title and Author'))
		}
	}

	const handleAddRandomBookViaApi = () => {
		dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
	}

	return (
		<form className={styles.form}>
			<label htmlFor='title'>TITLE:</label>
			<input
				className={styles.input}
				type='text'
				id='title'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<label htmlFor='title'>AUTHOR:</label>
			<input
				className={styles.input}
				type='text'
				id='author'
				value={author}
				onChange={e => setAuthor(e.target.value)}
			/>
			<button type='submit' className={styles.bookBtn} onClick={handleSubmit}>
				ADD BOOK
			</button>
			<button type='button' className={styles.bookBtn} onClick={addRandomBook}>
				ADD RANDOM BOOK
			</button>
			<button
				className={styles.bookBtn}
				type='button'
				onClick={handleAddRandomBookViaApi}
				disabled={isLoadingViaAPI}
			>
				{isLoadingViaAPI ? (
					<>
						<span>Loading...</span>
						<FaSpinner className={styles.spinner} />
					</>
				) : (
					'Add random book via API'
				)}
			</button>
		</form>
	)
}
