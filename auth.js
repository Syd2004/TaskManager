function getCurrentUser() {
    const userId = localStorage.getItem("currentUser")

    if (!userId) {
        return null
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")

    return users.find(user => user.id === userId) || null
}
