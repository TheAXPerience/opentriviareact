const LOCAL_STORAGE_KEY = 'leaderboards';

// add new item to leaderboards
export const addToLeaderboards = (leaderboards, categoryLimit, payload) => {
    // add to end
    leaderboards.push(payload);

    // push down while score is higher
    let i = leaderboards.length - 1;
    while (i > 0) {
        if (leaderboards[i].score <= leaderboards[i-1].score) {
            break;
        }

        const tmp = leaderboards[i];
        leaderboards[i] = leaderboards[i-1];
        leaderboards[i-1] = tmp;
        i--;
    }

    while (leaderboards.length > categoryLimit) {
        leaderboards.pop();
    }
}

// load from local storage
export const loadLeaderboards = () => {
    const leaderboards = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    return leaderboards ? leaderboards : {};
}

// save to local storage
export const saveLeaderboards = (leaderboards) => {
    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(leaderboards)
    );
}