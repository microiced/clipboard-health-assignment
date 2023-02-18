const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "O";
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate = TRIVIAL_PARTITION_KEY;

    const createHash = (data) => {
        return candidate = crypto
            .createHash("sha3-512")
            .update(data)
            .digest("hex")
            .toString();
    }

    if (event && event.partitionKey) {
        candidate = event.partitionKey;
    } else if (event) {
        const data = JSON.stringify(event);
        candidate = createHash(data);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = createHash(candidate);
    }

    return candidate;
};
