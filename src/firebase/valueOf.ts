import Reference = firebase.database.Reference;

export async function valueOf<T = any>(ref: Reference): Promise<T | undefined> {
    let snapshot = await ref.once('value');
    let value = snapshot.val();
    return value === null ? undefined : value;
}
