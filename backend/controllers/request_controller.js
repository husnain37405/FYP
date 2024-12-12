import Request from "../models/requestSchema.js"
import CurrentAccount from "../models/currentAccountSchema.js"
const getAllRequests = async (req, res) => {
    try {
        let requests = await Request.find()
            .populate('projectId', 'title')
            .populate('userId', 'name contact')
            .exec();

        if (requests.length > 0) {
            let modifiedRequests = requests.map((request) => {
                return {
                    _id: request._id,
                    projectId: request.projectId?._id || null,
                    projectTitle: request.projectId?.title || "Unknown Project",
                    userId: request.userId?._id || null,
                    requesterName: request.userId?.name || "Anonymous",
                    userContact: request.userId?.contact || "No contact info",
                    description: request.description,
                    amount: request.amount,
                    status: request.status,
                    rejectreason: request.rejectReason || "N/A",
                    date: request.date
                };
            });

            res.json(modifiedRequests);
        } else {
            res.status(404).json({ message: "No requests found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const getRequestersRequest = async (req, res) => {
    try {
        const requesterId = req.user._id.toString();//I converted it to string to check it
        const [requests, totalAccepted, totalPending, totalRejected] = await Promise.all([
            Request.find({ userId: requesterId })
                .populate('projectId', 'title')
                .exec(),
            Request.countDocuments({ userId: requesterId, status: "Accepted" }),
            Request.countDocuments({ userId: requesterId, status: "Pending" }),
            Request.countDocuments({ userId: requesterId, status: "Rejected" }),
        ]);

        if (requests.length > 0) {
            const requesterRequests = requests.map((request) => ({
                _id: request._id,
                projectId: request.projectId?._id || null,
                projectTitle: request.projectId?.title || "Unknown Project",
                description: request.description,
                amount: request.amount,
                status: request.status,
                rejectreason: request.rejectReason || "N/A",
                date: request.date,
            }));

            res.json({
                totalAccepted,
                totalPending,
                totalRejected,
                requests: requesterRequests,
            });
        } else {
            res.status(404).json({
                message: "No request history found.",
                totalAccepted: 0,
                totalPending: 0,
                totalRejected: 0,
                requests: [],
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const requesterId = req.user._id.toString();
        const { id } = req.params;

        const request = await Request.findOne({ _id: id, userId: requesterId });

        if (!request) {
            return res.status(404).json({ message: "Request not found or unauthorized access." });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({ message: "Only pending requests can be deleted." });
        }

        await Request.deleteOne({ _id: id });
        res.status(200).json({ message: "Request deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


const getRequestsStats = async (req, res, next) => {
    try {
        const totalRequests = await Request.countDocuments();
        res.status(200).json({ totalRequests });
    } catch (error) {
        next(error);
    }
};

const updateReq = async (req, res) => {
    try {
        const { status, rejectReason } = req.body;
        const { id: requestId } = req.params;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status, rejectReason },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (status === 'Accepted') {
            const amountToAdd = Number(updatedRequest.amount);

            const updatedAccount = await CurrentAccount.findOneAndUpdate(
                {},
                { $inc: { totalPaidAmount: amountToAdd } },
                { new: true, upsert: true }
            );

            return res.json({
                message: "Request updated successfully and account adjusted.",
                request: updatedRequest,
                account: updatedAccount
            });
        }

        res.json({ message: "Request updated successfully.", request: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating request", error: err.message });
    }
};


const addRequest = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing or invalid" });
        }

        const request = new Request({
            ...req.body,
            userId,
            status: 'Pending',
        });

        const result = await request.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding request", error: err.message });
    }
};

const requesterUpdateReq = async (req, res) => {
    try {
        const { description, amount } = req.body;
        console.log(req.body)
        const { id: requestId } = req.params;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { description, amount },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.json({ message: "Request updated successfully.", request: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating request", error: err.message });
    }
};


export {
    getAllRequests,
    getRequestersRequest,
    addRequest,
    updateReq,
    getRequestsStats,
    deleteRequest,
    requesterUpdateReq
};