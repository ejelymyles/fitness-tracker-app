"""changed Log time from time object to integer

Revision ID: 3b6eadb82125
Revises: 060d7097837f
Create Date: 2024-05-23 22:51:51.814641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b6eadb82125'
down_revision = '060d7097837f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('logs', schema=None) as batch_op:
        batch_op.alter_column('time',
               existing_type=sa.TIME(),
               type_=sa.Integer(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('logs', schema=None) as batch_op:
        batch_op.alter_column('time',
               existing_type=sa.Integer(),
               type_=sa.TIME(),
               existing_nullable=True)

    # ### end Alembic commands ###
