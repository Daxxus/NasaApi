window.onload = function () {
	nasa.init()
}

class NASA {
	constructor() {
		this.select = document.querySelector("#select")
		this.title = document.querySelector(".title")
		this.explanation = document.querySelector(".explanation")
		this.date = document.querySelector(".date")
		this.activate = document.querySelector(".activate")
		this.prev = document.querySelector(".prev")
		this.next = document.querySelector(".next")
		this.iframe = document.querySelector("#frame")

		this.idPage = 0
		this.dataArr = []
	}
	init() {
		this.startApp()
		this.listeners()
	}
	startApp = async () => {
		const KEY = "fYlbEVUUat4BmrsL58anuBYz0KAzhL3DkfkiIk1u"
		const Pic = `https://api.nasa.gov/planetary/apod?count=100&api_key=${KEY}`

		try {
			const resp = await fetch(Pic)
			const res = await resp.json()
			this.filterData(res)
		} catch (err) {
			console.error(err)
		}
	}
	filterData = (data) => {
		this.selected = this.select.options[select.selectedIndex]
		if (this.selected.value == 0) {
			return
		} else {
			this.processData(data)
		}
	}

	processData = (data) => {
		this.allPara = [...document.querySelectorAll(".details p")]
		this.allPara.forEach((paragraph) => paragraph.classList.add("active"))
		if (this.selected.textContent === "image") {
			data
				.filter((ftl) => this.filterIMG(ftl))
				.forEach((el) => {
					this.clearParagraphs()
					this.iframe.classList.remove("showUp")
					document.body.style.backgroundImage = `url(${el.hdurl})`
					this.dataArr.push(el)
					this.paragraphs(el)
				})
		} else {
			data
				.filter((ftl) => this.filterVideo(ftl))
				.forEach((el) => {
					this.clearParagraphs()
					document.body.style.backgroundImage = "none"
					this.iframe.src = el.url
					this.iframe.classList.add("showUp")
					this.dataArr.push(el)
					this.paragraphs(el)
				})
		}
	}
	nextMedia = () => {
		if (this.selected.value == 0) {
			return
		} else {
			if (this.idPage >= this.dataArr.length - 1) return

			let currentMedia = this.dataArr[(this.idPage += 1)]
			// this.clearParagraphs()
			document.body.style.backgroundImage = `url(${currentMedia.hdurl})`
			let currInd = this.dataArr.indexOf(currentMedia)
			this.paragraphs(currentMedia)

			// console.log(currInd)
			console.log(this.dataArr)
			console.log(currInd)
		}
	}
	prevMedia = () => {
		if (this.selected.value == 0) {
			return
		} else {
			if (this.idPage <= 0) return
			let currentMedia = this.dataArr[(this.idPage -= 1)]
			// this.clearParagraphs()
			this.paragraphs(currentMedia)
			document.body.style.backgroundImage = `url(${currentMedia.hdurl})`
			let currInd = this.dataArr.indexOf(currentMedia)

			console.log(this.dataArr)
			console.log(currInd)
		}
	}

	filterVideo = (v) => {
		const selectedContext = ["video"]
		return selectedContext.every((string) => v.media_type.includes(string))
	}
	filterIMG = (v) => {
		const selectedContext = ["image"]
		return selectedContext.some((string) => v.media_type.includes(string))
	}

	paragraphs = (each) => {
		this.title.textContent = `Title: ${each.title}`
		this.explanation.textContent = `Explanation: ${each.explanation}`
		this.date.textContent = `Date: Of ${each.date}`
	}

	clearParagraphs = () => {
		this.allPara.forEach((p) => {
			p.textContent = ""
		})
		this.idPage = 0
	}

	listeners = () => {
		this.activate.addEventListener("click", this.startApp)
		this.next.addEventListener("click", this.nextMedia)
		this.prev.addEventListener("click", this.prevMedia)
	}
}
const nasa = new NASA()
