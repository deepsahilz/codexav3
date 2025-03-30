import Tag from "../models/TagModel.js";

export const getSearchedTags = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        const tags = await Tag.find({ name: { $regex: new RegExp(`^${query}`, "i") } })
            .limit(6);

        res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
};

