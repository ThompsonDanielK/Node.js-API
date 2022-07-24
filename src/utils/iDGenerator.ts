const generateID = (currentDate: Date) => {
    const dateString = currentDate.toString().replace(/\D/g, '');

    const randomNumberString = Math.random().toString(36).substring(2, 8);

    return `${dateString}-${randomNumberString}`;
}

export default { generateID };