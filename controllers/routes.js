const router = require("express").Router()
const { read, save } = require("../helper/rw")
const dbPath = "./api/blog.json"

// Read all database entries
router.get("/", (_, res) => {
    try {
        const allComments = read(dbPath)
        res.status(200).json(allComments)
    } catch {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// Find entry by id
router.get("/:id", (req, res) => {
    try {
        const { post_id } = req.params
        const db = read(dbPath)
        const found = db.find(entry => entry.posT_id === post_id)
        res.status(200).json(found)
    } catch {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// create new entries
router.post("/create", (req, res) => {
    try {
        const db = read(dbPath)
        let create = {...req.body}
        console.log(create)
        db.push(create)
        save(db, dbPath)
        res.status(200).json(create)
    } catch {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// Update an entry
router.put("/update/:id", (req, res) => {
    try {
        const { post_id } = req.params
        const db = read(dbPath)
        const found = db.findIndex(entry => entry.post_id === post_id)
        db[found].post_id = req.body.post_id ?? db[found.post_id]
        db[found].title = req.body.title ?? db[found].title
        db[found].author = req.body.author ?? db[found].author
        db[found].body = req.body.body ?? db[found].body
        save(db, dbPath)
        res.status(200).json({
            message: `Updated data at index of ${found}`,
            data: db[found]
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// Delete an entry
router.delete("/delete/:id", (req, res) => {
    try {
        const { post_id } = req.params
        let db = read(dbPath)
        db = db.filter(entry => entry.post_id != post_id)
        save(db, dbPath)
        res.status(200).json({
            message: `Database updated`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router