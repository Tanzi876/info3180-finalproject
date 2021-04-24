"""empty message

Revision ID: e1f2a5a3f8aa
Revises: 
Create Date: 2021-04-24 08:04:44.701610

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1f2a5a3f8aa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=80), nullable=True),
    sa.Column('make', sa.String(length=80), nullable=True),
    sa.Column('model', sa.String(length=80), nullable=True),
    sa.Column('colour', sa.String(length=80), nullable=True),
    sa.Column('year', sa.String(length=80), nullable=True),
    sa.Column('transmission', sa.String(length=80), nullable=True),
    sa.Column('car_type', sa.String(length=80), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('photo', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favourites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id', 'car_id', 'user_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=80), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('biography', sa.String(length=80), nullable=True),
    sa.Column('photo', sa.String(length=80), nullable=True),
    sa.Column('date_joined', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('favourites')
    op.drop_table('cars')
    # ### end Alembic commands ###
