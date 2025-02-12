export const formatDate = (date: Date | string | undefined) => {
	if (!date) {
		return date
	}

	return new Date(date).toLocaleDateString("pl-PL");
}