"""
This file organizes all of the SQL statement APIs that chat.py will use.
"""


def create_sql(table, columns, types):
    """
    Constructs CREATE query statements for the system to use.
    :param table: The table to access information from.
    :param columns: A string or list of columns within the table.
    :param types: A
    :return: The constructed CREATE query.
    """
    create_query = 'CREATE TABLE %s (' % table

    if isinstance(columns, str):
        create_query += '%s %s' % (columns, types)

    elif isinstance(columns, list):
        create_query += '%s %s' % (columns[0], types[0])

        for i in range(1, len(columns)):
            create_query += ', %s %s' % (columns[i], types[i])

    else:
        return 'Variable columns has invalid type.'

    create_query += ')'

    return create_query


def select_sql(table, columns):
    """
    Constructs SELECT query statements for the system to use.
    :param table: The table to access information from.
    :param columns: A string or list of columns within the table.
    :return: The constructed SELECT query.
    """
    select_query = 'SELECT '

    if isinstance(columns, str):
        select_query += '%s' % columns

    elif isinstance(columns, list):
        select_query += '%s' % columns[0]

        for i in range(1, len(columns)):
            select_query += ', %s' % columns[i]

    else:
        return 'Variable columns has invalid type.'

    select_query += ' FROM %s' % table

    return select_query


def insert_sql(table, columns, values):
    """
    Constructs INSERT query statements for the system to use.
    :param table: The table to insert information into.
    :param columns: A string or list of columns within the table.
    :param values: A value or list of values to put into each column.
    :return: The constructed INSERT query.
    """
    insert_query = 'INSERT INTO %s(' % table

    # inserting column names into the query
    if isinstance(columns, str):
        insert_query += '%s' % columns

    elif isinstance(columns, list):
        insert_query += '%s' % columns[0]

        for i in range(1, len(columns)):
            insert_query += ', %s' % columns[i]

    else:
        return 'Variable columns has invalid type.'

    insert_query += ') VALUES ('

    # inserting values into the query
    if isinstance(values, str):
        insert_query += '%s' % values

    elif isinstance(values, list):
        insert_query += '%s' % values[0]

        for i in range(1, len(values)):
            insert_query += ', %s' % values[i]

    else:
        return 'Variable values has invalid type.'

    insert_query += ')'

    return insert_query


def update_sql(table, columns, values):
    """
    Constructs UPDATE query statements for the system to use.
    :param table: The table to update information in.
    :param columns: A string or list of columns within the table.
    :param values: A value or list of values to put into each column.
    :return: The constructed UPDATE query.
    """
    update_query = 'UPDATE %s SET ' % table

    if isinstance(columns, str):
        update_query += '%s=%s' % (columns, values)

    elif isinstance(columns, list):
        update_query += '%s=%s' % (columns[0], values[0])

        for i in range(1, len(columns)):
            update_query += ', %s=%s' % (columns[i], values[i])

    else:
        return 'Variables columns and values has invalid type.'

    return update_query


def delete_sql(table):
    """
        Constructs DELETE query additions for the system to use.
        :param table: The table to update information in.
        :return: The constructed DELETE query.
        """
    return 'DELETE FROM %s' % table


def where_sql(column, value, continuation=False, equality='='):
    """
    Constructs WHERE query additions for the system to use.
    :param column: A column that a value must be set to.
    :param value: The value that must be set for filtering.
    :param continuation: Boolean value of whether or not the WHERE query should have multiple filter conditions.
    :param equality: Specifies the equality of the conditional statement
    :return: The constructed WHERE query.
    """
    where_query = ''
    if not continuation:
        where_query = ' WHERE '

    where_query += '%s %s %s' % (column, equality, value)

    return where_query


def where_ts_sql(column, desired_words, conjunction):
    if isinstance(desired_words, str):
        query_string = desired_words
    elif isinstance(desired_words, list) and len(desired_words) == 2:
        query_string = desired_words[0] + ' ' + conjunction + ' ' + desired_words[1]
    else:
        return 'Variable desired_words is not valid.'

    query_string = '\'%s\'' % query_string

    return ' WHERE tsvector(%s) @@ tsquery(%s)' % (column, query_string)


def inner_join_sql(orig_table, join_table, orig_col, join_col):
    """
    Constructs INNER JOIN query additions for the system to use.
    :param orig_table: The originally selected table.
    :param join_table: The table joining the other table.
    :param orig_col: The column of the original table for the foreign key relation.
    :param join_col: The column of the joining table for the foreign key relation.
    :return: The constructed INNER JOIN query.
    """
    inner_join_query = ' INNER JOIN %s ' % join_table

    if ' ' in join_table:
        join_table = join_table.split(' ')[-1]

    inner_join_query += 'ON %s.%s=%s.%s' % (orig_table, orig_col, join_table, join_col)
    return inner_join_query


def upsert_sql(conflict_col, columns, values):
    """
    Constructs UPSERT query additions for the system to use.
    :param conflict_col: The conflict variable, in which in a conflict, the given columns are updated.
    :param columns: A string or list of columns within the table.
    :param values: A value or list of values to put into each column.
    :return: The constructed UPSERT query.
    """
    upsert_query = ' ON CONFLICT %s DO UPDATE SET ' % conflict_col

    if isinstance(columns, str) and isinstance(values, str):
        upsert_query += '%s=%s' % (columns, values)

    elif isinstance(columns, list) and isinstance(values, list):
        upsert_query += '%s=%s' % (columns[0], values[0])

        for i in range(1, len(columns)):
            upsert_query += ', %s=%s' % (columns[i], values[i])

    else:
        return 'Variables columns and values has invalid type.'

    return upsert_query


def returning_sql(columns):
    """
    Constructs RETURNING query additions for the system to use.
    :param columns: A string or list of columns within the table.
    :return: The constructed RETURNING query.
    """
    returning_query = ' RETURNING '

    if isinstance(columns, str):
        returning_query += '%s' % columns

    elif isinstance(columns, list):
        returning_query += '%s' % columns[0]

        for i in range(1, len(columns)):
            returning_query += ', %s' % columns[i]

    else:
        return 'Variable columns has invalid type.'

    return returning_query


def count_sql(column, is_distinct=False):
    count_query = 'COUNT ('

    if is_distinct:
        count_query += 'DISTINCT '

    count_query += '%s)' % column

    return count_query


def as_sql(alias):
    return 'AS %s' % alias


def union_all_sql(query1, query2):
    return '(%s UNION ALL %s) ' % (query1, query2)


def length_sql(string):
    return 'LENGTH(%s) ' % string


def extract_sql(data, column):
    return 'EXTRACT(%s FROM %s) ' % (data, column)
