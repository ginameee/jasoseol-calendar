const dbPool = require("./common").dbPool;

createSchedule = async ({ date, content }) => {
    const sql = `
        insert into
            schedule(event_date, event_content)
        values(
            '${date}',
            '${content}'
        )
    `;

    const client = await dbPool.connect();

    try {
        await client.query(sql);
        return null;
    }
    finally {
        client.release();
    }
};

readSchedules = async ({ year, month }) => {
    const sql = `
        select
            to_char(event_date, 'yyyy-mm-dd') as date,
            event_content as event
        from
            schedule
        where
            EXTRACT(YEAR from event_date) = ${year}
            AND EXTRACT(MONTH from event_date) = ${month}
    `;
    const client = await dbPool.connect();

    try {
        const res = await client.query(sql);
        return res.rows;
    }
    finally {
        client.release();
    }
}

module.exports.createSchedule = createSchedule;
module.exports.readSchedules = readSchedules;