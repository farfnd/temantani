import knex from '../../../infrastructure/knex.js';

export default ({
    tableName = '',
    selectableProps = [],
    timeout = 1000
}) => {
    const query = () => knex.table(tableName);

    const create = props => {
        const { id, ...restProps } = props;
        return query().insert(restProps)
            .returning(selectableProps)
            .timeout(timeout);
    };

    const findAll = () => {
        return query().select(selectableProps)
            .timeout(timeout);
    };

    const find = filters => {
        return query().select(selectableProps)
            .where(filters)
            .timeout(timeout);
    };

    const update = (id, props) => {
        const { id: _, ...restProps } = props;
        return query().update(restProps)
            .where({ id })
            .returning(selectableProps)
            .timeout(timeout);
    };

    const destroy = id => {
        return query().del()
            .where({ id })
            .timeout(timeout);
    };

    return {
        query,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        update,
        destroy
    };
};
